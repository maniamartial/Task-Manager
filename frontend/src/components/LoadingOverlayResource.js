import React, { useState, useMemo } from "react";
import { PropTypes } from "prop-types";
import { Backdrop, Box, CircularProgress } from "@mui/material";

export const LoadingOverlayResourceContext = React.createContext({
  setLoading: () => {},
});

export default function LoadingOverlayResource({ children }) {
  const [loading, setLoading] = useState(false);
  const overlayValue = useMemo(() => {
    return { setLoading };
  }, [setLoading]);

  return (
    <LoadingOverlayResourceContext.Provider value={overlayValue}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100vh",
        }}
      >
        <Backdrop
          sx={{
            background: "rgba(0,0,0,0.2)",
            display: "flex",
            width: "100%",
            height: "100vh",
            position: "absolute",
          }}
          open={loading}
        >
          <CircularProgress />
        </Backdrop>
        {children}
      </Box>
    </LoadingOverlayResourceContext.Provider>
  );
}

LoadingOverlayResource.propTypes = {
  children: PropTypes.node,
};
