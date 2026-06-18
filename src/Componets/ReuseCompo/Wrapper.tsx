import type { WrapperProp } from "../../Types";

function Wrapper({ children }: WrapperProp) {
  return (
    <div className={`w-full min-h-screen bg-sky-50 overscroll-x-none`}>
      <div className={`max-w-[85] mx-auto px-4 sm:px-6 lg:px-8`}>{children}</div>
    </div>
  );
}

export default Wrapper;
