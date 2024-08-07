import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import EditProfile from "./EditSetting";

const Setting = () => {
  return (
    <div className="flex items-center justify-center">
      <Card className="min-w-[350px] ">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-green-500">
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid items-center w-full gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label className="text-xl font-bold" htmlFor="name">
                  Name
                </Label>
                <div>test user name lol</div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-xl font-bold" htmlFor="name">
                  Email
                </Label>
                <div>test user name lol</div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-xl font-bold" htmlFor="name">
                  Password
                </Label>
                <div>test user name lol</div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-xl font-bold" htmlFor="name">
                  Bio
                </Label>
                <div>test user name lol</div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <EditProfile />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Setting;
