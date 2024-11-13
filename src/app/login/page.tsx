import * as React from "react";

interface IPageProps {}

const Page: React.FunctionComponent<IPageProps> = (props) => {
  return (
    <>
      <form>
        <label htmlFor="">Email</label>
        <input type="text" name="email" placeholder="Email" />

        <br />

        <label htmlFor="">Password</label>
        <input type="password" name="password" placeholder="Password" />
      </form>
    </>
  );
};

export default Page;
