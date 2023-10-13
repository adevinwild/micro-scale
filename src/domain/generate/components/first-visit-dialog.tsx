import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

const FirstVisitDialog = ({ close }: { close: () => void }) => {
  return (
    <Dialog open onOpenChange={close}>
      <DialogContent className="rounded first-letter:lg:max-w-sm">
        <DialogHeader>
          <DialogTitle className="pb-2">Welcome to µScale 👋</DialogTitle>
          <DialogDescription>
            µScale was designed as part of a hackathon, so it remains free of
            charge throughout the hackathon period!
          </DialogDescription>
          <DialogDescription className="pt-2">
            If you&apos;d like to support my work, it would be great if you can
            upvote me{" "}
            <a
              className="font-medium text-blue-500 underline"
              href="https://thefullstack.network/adevinwild/project/micro-scale-a-hackathon-entry"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>{" "}
            or put a{" "}
            <a
              className="font-medium text-blue-500 underline "
              href="https://github.com/adevinwild/micro-scale"
              target="_blank"
              rel="noreferrer"
            >
              star on my GitHub repo
            </a>{" "}
            🙌
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FirstVisitDialog;
