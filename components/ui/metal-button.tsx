"use client"

/**
 * `metal-fx` around `Button` — liquid metal ring for controls.
 * `className` styles the button; `metalFxClassName` styles the MetalFx wrapper.
 *
 * With `normalizeHostStyles` (default), variant fills live on the MetalFx wrapper
 * and the button stays transparent so the shader ring stays visible. Pass
 * `normalizeHostStyles={false}` to keep all shadcn chrome on the button (filled
 * variants will cover most of the metal).
 */
import type { ComponentProps, CSSProperties, Ref } from "react"
import { forwardRef, useEffect, useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { MetalFx, type MetalFxProps, type MetalFxVariant } from "metal-fx"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * `metal-fx` throws "WebGL not supported" the instant it can't get a WebGL
 * context (headless browsers, GPU-less VMs, hardware accel disabled). That
 * throw is synchronous and uncaught, so it tears down the whole React tree and
 * every page rendering a MetalButton goes blank. We mirror metal-fx's own
 * context probe and only mount the shader when it can actually run.
 *
 * `supported` starts `false` so SSR and the first client render agree on the
 * plain fallback (no hydration mismatch); we upgrade after mount.
 */
let webglSupported: boolean | null = null

function detectWebGL(): boolean {
  if (webglSupported !== null) return webglSupported
  try {
    const canvas = document.createElement("canvas")
    const gl =
      canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl")
    webglSupported = Boolean(gl)
  } catch {
    webglSupported = false
  }
  return webglSupported
}

function useWebGLSupported() {
  const [supported, setSupported] = useState(false)
  useEffect(() => {
    setSupported(detectWebGL())
  }, [])
  return supported
}

const metalSurfaceVariants = cva("transition-colors", {
  variants: {
    variant: {
      default: "bg-primary! text-primary-foreground! hover:bg-primary/80!",
      outline:
        "bg-background! text-foreground! hover:bg-input/50! dark:bg-input/30!",
      secondary:
        "bg-secondary! text-secondary-foreground! hover:bg-secondary/80!",
      ghost:
        "bg-transparent! text-foreground! hover:bg-muted/50! dark:hover:bg-muted/50!",
      destructive:
        "bg-destructive/10! text-destructive! hover:bg-destructive/20! dark:bg-destructive/20! dark:hover:bg-destructive/30!",
      link: "bg-transparent! text-primary!",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

/** Strip outer chrome on the host; MetalFx punches the ring around the interior. */
const metalHostChromeReset =
  "border-0! bg-transparent! shadow-none! hover:bg-transparent! aria-expanded:bg-transparent!"

/** Keep a stable edge above the animated shader so bright frames cannot erase it. */
const metalStableEdge =
  "relative isolate before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:ring-1 before:ring-border/70 before:ring-inset dark:before:ring-border/80"

type MetalSurfaceVariant = NonNullable<
  VariantProps<typeof metalSurfaceVariants>["variant"]
>

type MetalShellProps = Pick<
  MetalFxProps,
  | "preset"
  | "theme"
  | "strength"
  | "paused"
  | "borderRadius"
  | "disableGlow"
  | "reflectionTargets"
  | "shaderScale"
  | "ringCssPx"
  | "scale"
  | "normalizeHostStyles"
> & {
  metalVariant?: MetalFxVariant
  metalFxClassName?: string
  metalFxStyle?: CSSProperties
}

export type MetalButtonProps = ComponentProps<typeof Button> & MetalShellProps

export type MetalIconButtonProps = MetalButtonProps

export const MetalButton = forwardRef<HTMLDivElement, MetalButtonProps>(
  function MetalButton(
    {
      metalVariant = "button",
      metalFxClassName,
      metalFxStyle,
      preset = "chromatic",
      theme = "auto",
      strength = 0.9,
      paused,
      borderRadius,
      disableGlow,
      reflectionTargets,
      shaderScale,
      ringCssPx,
      scale,
      normalizeHostStyles = true,
      variant = "default",
      className,
      ...buttonProps
    },
    ref
  ) {
    const surfaceVariant = variant as MetalSurfaceVariant
    const supported = useWebGLSupported()

    // No WebGL → render a normal shadcn button (full chrome, real variant fill)
    // instead of crashing. The metal ring simply doesn't appear.
    if (!supported) {
      return (
        <Button
          className={className}
          ref={ref as Ref<HTMLButtonElement>}
          variant={variant}
          {...buttonProps}
        />
      )
    }

    return (
      <MetalFx
        borderRadius={borderRadius}
        className={cn(
          "overflow-visible! inline-flex w-fit min-w-0 flex-col items-stretch leading-none",
          metalStableEdge,
          normalizeHostStyles &&
            metalSurfaceVariants({ variant: surfaceVariant }),
          metalFxClassName
        )}
        disableGlow={disableGlow}
        normalizeHostStyles={normalizeHostStyles}
        paused={paused}
        preset={preset}
        ref={ref}
        reflectionTargets={reflectionTargets}
        ringCssPx={ringCssPx}
        scale={scale}
        shaderScale={shaderScale}
        strength={strength}
        style={metalFxStyle}
        theme={theme}
        variant={metalVariant}
      >
        <Button
          className={cn(normalizeHostStyles && metalHostChromeReset, className)}
          variant={variant}
          {...buttonProps}
        />
      </MetalFx>
    )
  }
)

MetalButton.displayName = "MetalButton"

export const MetalIconButton = forwardRef<HTMLDivElement, MetalIconButtonProps>(
  function MetalIconButton(
    { size = "icon-sm", metalVariant = "circle", className, ...props },
    ref
  ) {
    return (
      <MetalButton
        className={cn(
          "leading-none! [&_svg]:block [&_svg]:shrink-0",
          className
        )}
        metalVariant={metalVariant}
        ref={ref}
        size={size}
        {...props}
      />
    )
  }
)

MetalIconButton.displayName = "MetalIconButton"
