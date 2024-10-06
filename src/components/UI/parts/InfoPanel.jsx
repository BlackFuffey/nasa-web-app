import {Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";

export default function () {
  return (
    <Card className="max-w-[400px] absolute right-5 top-2">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">NextUI</p>
          <p className="text-small text-default-500">nextui.org</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <Divider/>
      <CardFooter>
      </CardFooter>
    </Card>
  );
}
