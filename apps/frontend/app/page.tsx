import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
  return (
    <div>
      Home
      <h1 className="text-3xl font-bold text-emerald-200 underline">
        Hello world!
      </h1>
      <Button className="m-2 ">Hello JI</Button>
      <br />
      <Button className="m-2 font-medium " variant="secondary">Hello JI</Button>
    </div>
  );
};

export default Home;
