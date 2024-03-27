import { RefreshCwIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { type Error } from "./countries-store";

type ErrorProps = {
  message: Error["message"];
};

export default function Error({ message }: ErrorProps) {
  return (
    <div className="mt-28 grid place-items-center">
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-bold">An error has occurred</h2>
        <p className="text-lg">
          <span className="font-bold">Error: </span>
          {message}
        </p>
        <p className="text-xl">
          Try to reload the page. If the error persists, there is a chance the countries{" "}
          <a
            href="https://restcountries.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-oxford-oxford-blue underline underline-offset-2"
          >
            API
          </a>{" "}
          is down.
        </p>
        <Button variant="primary" className="w-fit" onClick={() => window.location.reload()}>
          <RefreshCwIcon className="mr-2 size-5" />
          Click to reload
        </Button>
      </div>
    </div>
  );
}
