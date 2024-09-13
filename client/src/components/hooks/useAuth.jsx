// const useAuth = () => {
//   const [isAuth, setIsAuth] = useState(!!localStorage.getItem("username"));
//   const {post} = usePost();

//   const match = useCallback(
//     async (user_name, password) => {
//       try {
//         const response = await post("/login", {user_name, password});

//         // Check if user object is returned to determine authentication success
//         if (response?.success) {
//           localStorage.setItem("username", user_name);
//           setIsAuth(true);
//           return true;
//         } else {
//           localStorage.removeItem("username");
//           setIsAuth(false);
//           return false;
//         }
//       } catch (err) {
//         console.error("Error during API request:", err);
//         localStorage.removeItem("username");
//         setIsAuth(false);
//         return false;
//       }
//     },
//     [post]
//   );

//   const logout = useCallback(() => {
//     localStorage.removeItem("username");
//     setIsAuth(false);
//   }, []);

//   const isAuthenticated = useCallback(() => isAuth, [isAuth]);

//   return {match, logout, isAuthenticated};
// };

// export default useAuth;

// export default useAuth;
