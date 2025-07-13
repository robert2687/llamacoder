import { memo } from "react";
import Spinner from "@/components/spinner";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

const LoadingButton = memo(function LoadingButton({
  children,
  ...rest
}: ComponentProps<"button">) {
  const { pending } = useFormStatus();

  return (
    <button {...rest} disabled={pending}>
      <Spinner loading={pending}>{children}</Spinner>
    </button>
  );
});

export default LoadingButton;
