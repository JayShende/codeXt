import { toast } from "sonner";
import { Button } from "./ui/button";

const ProCard = () => {
  return (
    <div className="bg-primary/30 border-primary mx-3 flex h-fit flex-col items-center justify-center gap-y-3 rounded-xl px-3 py-8">
      <div className="flex flex-col items-center justify-center">
        <span className="text-secondary font-semibold">Upgrade To Pro</span>
        <span className="text-xs">Get 1 Month Free </span>
      </div>
      <Button
        variant="outline"
        onClick={() => {
          toast.info("Coming Soon !!!");
        }}
      >
        Upgrade
      </Button>
    </div>
  );
};

export default ProCard;
