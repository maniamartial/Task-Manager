import { useCallback, useContext, useState } from "react";
import axios from "axios";

import { useSnackbar } from "notistack";
import formatHttpApiError from "src/helpers/formatHttpError";
import { LoadingOverlayResourceContext } from "src/components/LoadingOverlayResource";
import getCommonOptions from "src/helpers/axios/getCommonOptions";
export default function useRequestResource({ endpoint, resourceLabel }) {
  const [resourceList, setResourceList] = useState({
    results: [],
  });

  const [resource, setResource] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState(null);
  const loadingOverlay = useContext(LoadingOverlayResourceContext);
  const { setLoading } = loadingOverlay;

  const handleRequestResourceError = useCallback(
    (err) => {
      const formattedError = formatHttpApiError(err);
      setError(formattedError);
      setLoading(false);
      enqueueSnackbar(formattedError);
    },
    [enqueueSnackbar, setError, setLoading]
  );

  //Fetching data from teh django backend
  const getResourceList = useCallback(() => {
    //getting files from specific users

    setLoading(true);
    axios
      .get(`/api/${endpoint}/`, getCommonOptions())
      .then((res) => {
        setLoading(false);
        if (res.data.results) {
          setResourceList(res.data);
        } else {
          setResourceList({
            results: res.data,
          });
        }
      })
      .catch(handleRequestResourceError);
  }, [endpoint, handleRequestResourceError, setLoading]);
  //end of fetching data

  //Posting data to the backend
  const addResource = useCallback(
    (values, successCallback) => {
      setLoading(true);
      axios
        .post(`/api/${endpoint}/`, values, getCommonOptions())
        .then(() => {
          setLoading(false);
          enqueueSnackbar(`${resourceLabel} added`);
          if (successCallback) {
            successCallback();
          }
        })
        .catch(handleRequestResourceError);
    },
    [
      endpoint,
      setLoading,
      enqueueSnackbar,
      resourceLabel,
      handleRequestResourceError,
    ]
  );

  const getResource = useCallback(
    (id) => {
      setLoading(true);
      axios
        .get(`/api/${endpoint}/${id}`, getCommonOptions())
        .then((res) => {
          setLoading(false);
          const { data } = res;
          setResource(data);
        })
        .catch(handleRequestResourceError);
    },
    [endpoint, handleRequestResourceError, setLoading]
  );

  const updateResource = useCallback(
    (id, values, successCallback) => {
      setLoading(true);
      axios
        .patch(`/api/${endpoint}/${id}/`, values, getCommonOptions())
        .then(() => {
          setLoading(false);
          enqueueSnackbar(`${resourceLabel}/update`);
          if (successCallback) {
            successCallback();
          }
        })
        .catch(handleRequestResourceError);
    },
    [
      endpoint,
      handleRequestResourceError,
      setLoading,
      enqueueSnackbar,
      resourceLabel,
    ]
  );

  const deleteResource = useCallback(
    (id) => {
      setLoading(true);
      axios
        .delete(`/api/${endpoint}/${id}/`, getCommonOptions())
        .then(() => {
          setLoading(false);
          enqueueSnackbar(`${resourceLabel} deleted`);
          const newResourceList = {
            results: resourceList.results.filter((r) => {
              return r.id !== id;
            }),
          };
          setResourceList(newResourceList);
        })
        .catch(handleRequestResourceError);
    },
    [
      endpoint,
      resourceList,
      handleRequestResourceError,
      setLoading,
      enqueueSnackbar,
      resourceLabel,
    ]
  );

  return {
    resourceList,
    getResourceList,
    addResource,
    resource,
    getResource,
    updateResource,
    deleteResource,
    error,
  };
}
