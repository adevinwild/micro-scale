import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

const FirstWarningDialog = ({ close }: { close: () => void }) => {
  return (
    <Dialog open onOpenChange={close}>
      <DialogContent className="rounded first-letter:lg:max-w-sm">
        <DialogHeader>
          <DialogTitle className="pb-2">
            A special note, just for you 🫶🏻
          </DialogTitle>
          <DialogDescription>
            Just over <b>+1,400</b> of you have came across µScale and{" "}
            <b>+880</b> images have been upscaled, and it&apos;s just
            mind-blowing to me!
          </DialogDescription>

          <DialogDescription className="pt-2">
            As we approach the final day of the hackathon ,{" "}
            <em>I have a small favor to ask.</em>
          </DialogDescription>

          <DialogDescription>
            I would greatly appreciate it if you could take a moment to support
            me in the contest hosted by TheFullstack network.
          </DialogDescription>
          <DialogDescription>
            All it takes is a quick vote{" "}
            <a
              href="https://thefullstack.network/adevinwild/project/micro-scale-a-hackathon-entry"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-blue-500 underline dark:text-slate-50"
            >
              here
            </a>
          </DialogDescription>
          <DialogDescription>
            Your vote would mean the world to me.
            <br /> I invite you to continue enjoying the software and feel free
            to share your feedback on my X profile.
          </DialogDescription>

          <DialogDescription className="flex items-center justify-center pt-2 text-center lg:justify-start lg:text-left gap-x-2">
            <a href="https://x.com/adevinwild" target="_blank" rel="noreferrer">
              <Avatar className="w-6 h-6">
                <AvatarImage src="https://github.com/adevinwild.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </a>
            <span>
              With deep gratitude, <b>Adil</b>
            </span>
          </DialogDescription>
          <DialogFooter className="pt-2">
            <Button onClick={close} variant="ghost">
              Continue to µScale
            </Button>
            <a
              href="https://thefullstack.network/adevinwild/project/micro-scale-a-hackathon-entry"
              target="_blank"
              rel="noreferrer"
            >
              <Button autoFocus onClick={close}>
                Upvote µScale
              </Button>
            </a>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FirstWarningDialog;
