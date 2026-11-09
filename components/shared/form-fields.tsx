import type { ComponentProps, ReactNode } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { authInputClass, formInputClass } from "@/lib/styles"
import { cn } from "@/lib/utils"

const inputVariants = {
  default: formInputClass,
  auth: authInputClass,
} as const

type FieldFrameProps = {
  id?: string
  label: ReactNode
  children: ReactNode
  hint?: ReactNode
  containerClassName?: string
  labelClassName?: string
  hintClassName?: string
}

/** Shared label + control + hint layout for every form field. */
function FieldFrame({
  id,
  label,
  children,
  hint,
  containerClassName,
  labelClassName,
  hintClassName,
}: FieldFrameProps) {
  return (
    <div className={cn("flex flex-col gap-2", containerClassName)}>
      <Label htmlFor={id} className={labelClassName}>
        {label}
      </Label>
      {children}
      {hint ? (
        <p className={cn("text-xs text-white/40", hintClassName)}>{hint}</p>
      ) : null}
    </div>
  )
}

type TextFieldProps = ComponentProps<typeof Input> & {
  label: ReactNode
  variant?: keyof typeof inputVariants
  hint?: ReactNode
  startIcon?: ReactNode
  endIcon?: ReactNode
  containerClassName?: string
  labelClassName?: string
  hintClassName?: string
}

export function TextField({
  id,
  name,
  label,
  variant = "default",
  hint,
  startIcon,
  endIcon,
  className,
  containerClassName,
  labelClassName,
  hintClassName,
  required,
  ...props
}: TextFieldProps) {
  const fieldId = id ?? (typeof name === "string" ? name : undefined)

  return (
    <FieldFrame
      id={fieldId}
      label={label}
      hint={hint}
      containerClassName={containerClassName}
      labelClassName={labelClassName}
      hintClassName={hintClassName}
    >
      <div className="relative">
        {startIcon ? (
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-white/50 [&_svg]:size-4"
          >
            {startIcon}
          </span>
        ) : null}
        <Input
          id={fieldId}
          name={name}
          required={required}
          className={cn(
            inputVariants[variant],
            startIcon && "pl-9",
            endIcon && "pr-9",
            className
          )}
          {...props}
        />
        {endIcon ? (
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-white/50 [&_svg]:size-4"
          >
            {endIcon}
          </span>
        ) : null}
      </div>
    </FieldFrame>
  )
}

type TextareaFieldProps = ComponentProps<typeof Textarea> & {
  label: ReactNode
  hint?: ReactNode
  containerClassName?: string
  labelClassName?: string
  hintClassName?: string
}

export function TextareaField({
  id,
  name,
  label,
  hint,
  className,
  containerClassName,
  labelClassName,
  hintClassName,
  ...props
}: TextareaFieldProps) {
  const fieldId = id ?? (typeof name === "string" ? name : undefined)

  return (
    <FieldFrame
      id={fieldId}
      label={label}
      hint={hint}
      containerClassName={containerClassName}
      labelClassName={labelClassName}
      hintClassName={hintClassName}
    >
      <Textarea
        id={fieldId}
        name={name}
        className={cn(formInputClass, className)}
        {...props}
      />
    </FieldFrame>
  )
}

type SelectFieldProps = {
  id: string
  label: ReactNode
  value: string
  onValueChange: (value: string) => void
  items: readonly string[]
  placeholder?: string
  containerClassName?: string
  labelClassName?: string
  triggerClassName?: string
}

export function SelectField({
  id,
  label,
  value,
  onValueChange,
  items,
  placeholder,
  containerClassName,
  labelClassName,
  triggerClassName,
}: SelectFieldProps) {
  return (
    <FieldFrame
      id={id}
      label={label}
      containerClassName={containerClassName}
      labelClassName={labelClassName}
    >
      <Select value={value} onValueChange={(next) => onValueChange(next ?? "")}>
        <SelectTrigger
          id={id}
          className={cn(formInputClass, "w-full", triggerClassName)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FieldFrame>
  )
}
