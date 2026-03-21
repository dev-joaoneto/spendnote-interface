import { useEffect } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";


const Login = () => {
    
    const { signWithGoogle, authState } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
    try {
        await signWithGoogle();
    } catch (error) {
        console.error("Erro ao fazer login com Google", error);
    }
};

    useEffect(() => {
        if (authState.user && !authState.loading) {
            navigate("/dashboard");
        }
    }, [authState.user, authState.loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <header>
            <h1 className="text-center text-3xl font-extrabold text-gray-900">
                SpendNote
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
                Gerencie suas finanças de forma simples e eficiente.
            </p>
        </header>

        <main className="mt-8 bg-white py-8 px-4 shadow-md rounded-lg sm:px-10 space-y-6">
            <section className="text-center items-center">
                <h2 className="text-lg font-medium text-gray-900">
                    Faça login para continuar
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Insira suas credenciais para acessar sua conta e começar a gerenciar suas finanças.
                </p>
            </section>

            <GoogleLoginButton onClick={handleLogin} isLoading={false}/>

            {authState.error && (
                <div className="mt-4 text-red-600 text-sm text-center">
                    <p>{authState.error}</p>
                </div>
            )}

            <footer className="mt-6 items-center text-center">
                <p className="mt-1 text-sm text-gray-600">
                    Ao fazer login, você concorda com nossos Termos de Uso e Política de Privacidade.
                </p>
            </footer>

        </main>   
      </div>
    </div>
  );
};

export default Login;