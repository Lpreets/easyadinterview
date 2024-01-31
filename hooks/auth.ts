import axios from "@/lib/axios";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useAuth = (middleware: string = "") => { // Added type for middleware

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);

    const { data: user, error, mutate } = useSWR("/api/user",
        () => axios
            .get("/api/user")
            .then(response => response.data.data)
            .catch(error => {
                if (error.response.status !== 409)
                    throw error;
            })
    );

    const csrf = () => axios.get("/sanctum/csrf-cookie");

    type LoginProps = {
        setErrors: (errors: string[]) => void;
        [key: string]: any;
      };

      const login = async ({ setErrors, ...props }: LoginProps) => {
        setErrors([]);

        await csrf();

        axios
            .post("/login", props)
            .then(() => {
                mutate();
                router.push("/dashboard");
            })
            .catch(error => {
                if (error.response.status !== 422) throw error;

                setErrors(Object.values(error.response.data.errors).flat().map(String));
            });
    };

    const logout = async () => {
        await axios.post("/logout");

        mutate(null);

        router.push("/");
    };

    useEffect(() => {
        if (user || error) {
            setIsLoading(false);
        }

        if (middleware === "guest" && user) router.push("/");
        if (middleware === "auth" && error) router.push("/");
    }, [user, error, middleware, router]);

    return {
        user, csrf, isLoading, login, logout
    };
};