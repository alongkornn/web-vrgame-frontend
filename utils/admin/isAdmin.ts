import { useRouter } from "next/navigation";
import { getCookie } from "../jwt/getCookie";
import { decodeJWT } from "../jwt/decodejwt";


export const IsAdmin = (): boolean => {
    const token = getCookie("token");
    const router = useRouter();
    if (!token) {
      router.push("/login");
      return false;
    }

    const decodedToken = decodeJWT(token);

    if (decodedToken.role != "admin") {
        return false;
    }
    return true;
}
