import Feed from "@components/Feed";
import React from "react";

function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Prompotioa is an open source AI propmting tool for modern world to
        discover, create and share creative propmts
      </p>

      {/* Feeds */}
      <Feed />
    </section>
  );
}

export default Home;
