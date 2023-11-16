import React, { useEffect } from "react";


function Redirect() {
  useEffect(() => {
    window.location.href = "/";
  }, []);

  return (
    <div>
      {/* Loading Spinner at center of screen*/}
      <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                {/* Loading Indicator */}
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Redirecting...</span>
                </div>
              </div>
    </div>
  );
}

export default Redirect;