"use client";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import LoginButton from "../../components/LoginButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MintButton from "@/components/MintButton";

interface DecodedToken {
  user_id: number;
  eth_address: string;
  edu_username: string;
  iss: string;
  iat: number;
  exp: number;
  aud: string;
  [key: string]: any;
}

const UserPage = () => {
  const { authState, ocAuth } = useOCAuth();
  const router = useRouter();

  if (authState?.error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 p-4 rounded-md shadow-md">
          <p className="text-red-600">Error: {authState.error.message}</p>
        </div>
      </div>
    );
  } else {
    let userInfo: DecodedToken | null = null;

    if (authState?.idToken) {
      userInfo = jwtDecode<DecodedToken>(authState.idToken);
      console.log("userInfo", userInfo);

      console.log("OCID", ocAuth.getAuthState());
    }

    return (
      <div className="App min-h-screen flex flex-col items-center justify-between">
        <Header />
        <div className="flex flex-col items-center justify-center flex-grow w-full mt-24 px-4">
          <Card className=" w-full max-w-2xl p-8 shadow-lg">
            <CardHeader>
              {!userInfo ? (
                <></>
              ) : (
                <div className="text-center">
                  <CardTitle className="text-2xl font-bold mb-4">
                    Connect with OCID
                  </CardTitle>
                  <p className="mb-6 text-gray-600">
                    Please link with open campus to view your details.
                  </p>
                  <LoginButton />
                </div>
              )}
            </CardHeader>
            {/* {userInfo && (
              <CardContent>
                <div>
                  <p>
                    <strong>User ID:</strong> {userInfo.user_id}
                  </p>
                  <p>
                    <strong>Ethereum Address:</strong> {userInfo.eth_address}
                  </p>
                  <p>
                    <strong>Username:</strong> {userInfo.edu_username}
                  </p>
                  <p>
                    <strong>Issuer:</strong> {userInfo.iss}
                  </p>
                  <p>
                    <strong>Issued At:</strong>{" "}
                    {new Date(userInfo.iat * 1000).toLocaleString()}
                  </p>
                  <p>
                    <strong>Expiration:</strong>{" "}
                    {new Date(userInfo.exp * 1000).toLocaleString()}
                  </p>
                  <p>
                    <strong>Audience:</strong> {userInfo.aud}
                  </p>
                </div>
              </CardContent>
            )} */}
            {/* <CardFooter className="flex justify-center">
              <Button
                onClick={() => router.push("/")}
                className="bg-teal-400 hover:bg-teal-700 text-black font-bold py-2 px-4 rounded-md"
              >
                Go to Home
              </Button>
            </CardFooter> */}
            {userInfo && (
              <div className="mt-4 flex justify-center">
                <MintButton />
              </div>
            )}
          </Card>
        </div>
        <Footer />
      </div>
    );
  }
};

export default UserPage;
