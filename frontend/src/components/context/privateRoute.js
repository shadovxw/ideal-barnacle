// // src/components/protected/ProtectedDonate.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const ProtectedDonate = ({ children  }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const user = localStorage.getItem("LoggedInUser");

//   const [status, setStatus] = useState("loading"); // loading | verified | unverified

//   useEffect(() => {
//     // if no logged in user -> redirect to login
//     if (!user) {
//       navigate("/", { state: { from: location }, replace: true });
//       return;
//     }

//     let cancelled = false;
//     (async () => {
//       try {
//         const { data } = await axios.get(
//           `http://localhost:5000/user/data/${user}`,
//           { withCredentials: true }
//         );

//         if (cancelled) return;

//         if (!data?.userData?.isAccountVerified) {
//           // show toast and keep user on same page
//           toast.warn("⚠️ Please verify your account to donate.");
//           setStatus("unverified");
//         } else {
//           setStatus("verified");
//         }
//       } catch (err) {
//         console.error("ProtectedDonate error:", err);
//         // on error, treat as unverified to avoid showing donation UI
//         toast.error("Unable to verify account. Try logging in again.");
//         setStatus("unverified");
//       }
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, [user, navigate, location]);

//   if (status === "loading") {
//     return (
//       <div style={{ padding: 20, textAlign: "center" }}>
//         Loading donation access...
//       </div>
//     );
//   }

//   if (status === "unverified") {
//     // show a small locked UI instead of children (Donate)
//     return (
//       <div className="donate-locked" style={{
//           border: "1px solid #eee",
//           padding: 20,
//           borderRadius: 8,
//           textAlign: "center",
//           background: "#fff"
//         }}>
//         <h3 style={{ marginBottom: 8 }}>Donate</h3>
//         <p style={{ marginBottom: 12 }}>
//           Your account must be verified to make a donation.
//         </p>
//         <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
//           <button
//             onClick={() => navigate("/verify", { state: { from: location } })}
//             style={{
//               padding: "8px 12px",
//               borderRadius: 6,
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             Verify Account
//           </button>
//           <button
//             onClick={() => navigate("/")}
//             style={{
//               padding: "8px 12px",
//               borderRadius: 6,
//               border: "1px solid #ccc",
//               background: "transparent",
//               cursor: "pointer",
//             }}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // verified
//   return <>{children}</>;
// };

// export default ProtectedDonate;

// src/components/protected/ProtectedDonate.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedDonate = ({ children, roles }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = localStorage.getItem("LoggedInUser");

  const [status, setStatus] = useState("loading"); 
  const [userData, setUserData] = useState(null);

  const allowedRoles = React.useMemo(() => {
    if (!roles) return null; 
    if (Array.isArray(roles)) return roles.map(String);
    return [String(roles)];
  }, [roles]);

  useEffect(() => {
    if (!user) {
      navigate("/", { state: { from: location }, replace: true });
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/user/data/${user}`,
          { withCredentials: true }
        );

        if (cancelled) return;

        const u = data?.userData || null;
        console.log(u)
        setUserData(u);

        if (!u?.isAccountVerified) {
          toast.warn("⚠️ Please verify your account to donate.");
          setStatus("unverified");
          return;
        }
        console.log(u?.role)
        if (allowedRoles && u?.role && !allowedRoles.includes(u.role)) {
          console.log("vrishank")
          toast.error("🚫 You are not authorized to access this section.");
          setStatus("unauthorized");
          navigate(location.state?.from || "/", { replace: true });
          return;
        }

        setStatus("verified");
      } catch (err) {
        console.error("ProtectedDonate error:", err);
        toast.error("Unable to verify account. Try logging in again.");
        setStatus("unverified");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, navigate, location, allowedRoles]);

  if (status === "loading") {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        Please log in and verify your email to make a donation...
      </div>
    );
  }

  if (status === "unverified") {
    return (
      <div
        className="donate-locked"
        style={{
          border: "1px solid #eee",
          padding: 20,
          borderRadius: 8,
          textAlign: "center",
          background: "#fff",
        }}
      >
        <h3 style={{ marginBottom: 8 }}>Donate</h3>
        <p style={{ marginBottom: 12 }}>
          Please log in and verify your email to make a donation.
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <button
            onClick={() => navigate("/verify", { state: { from: location } })}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
            }}
          >
            Verify your Account
          </button>
        </div>
      </div>
    );
  }

  if (status === "unauthorized") {
    // Already redirected + toast shown, nothing to render
    return null;
  }

  // verified
  const injectUserData = (child) =>
    React.isValidElement(child) ? React.cloneElement(child, { userData }) : child;

  return Array.isArray(children)
    ? <>{children.map((c) => injectUserData(c))}</>
    : <>{injectUserData(children)}</>;
};

export default ProtectedDonate;
