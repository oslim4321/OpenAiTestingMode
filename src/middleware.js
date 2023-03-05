// export default function middleware(req, event) {
//   if (req.nextUrl.pathname === "/url/login") {
//     new Response("hello friend");
//   }
//   return;
// }

import { NextResponse } from "next/server";

export const config = {
  runtime: "edge", // this is a pre-requisite
  regions: ["iad1"], // only execute this function on iad1
};

export default (req) => {
  // return NextResponse.json({
  //   name: `Hello, from ${req.url} I'm now an Edge Function!`,
  // });
};
