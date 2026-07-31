
import { authUser } from "@/utils/serverHelpers";
import { redirect } from "next/navigation";
import TasviehContent from "./TasviehContent";

export default async function TasviehPage() {
  const user = await authUser();


  if (!user) {
    redirect("/login");
  }


  return <TasviehContent />;
}