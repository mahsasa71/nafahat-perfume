import Layout from "@/components/layout/UserPanelLayout";
import AccountDetails from "@/components/templates/details/AccountDetails";

import { authUser } from "@/utils/serverHelpers";
const page = async () => {
    const user = await authUser();

  return (
    <Layout>
            <AccountDetails user={JSON.parse(JSON.stringify(user))} />

    </Layout>
  );
};

export default page;
