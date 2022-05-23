import { useCallback, useState } from "react";
import axios from "axios";

import React from "react";
import { useSnackbar } from "notistack";
import formatHttpApiError from "src/helpers/formatHttpError";

export default function useRequestResource({ endpoint, resourceLabel }) {
  const [resourceList, setResourceList] = useState({
    results: [],
  });

  const [resource, setResource] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState(null);

  const handleRequestResourceError = useCallback(
    (err) => {
      const formattedError = formatHttpApiError(err);
      setError(formattedError);
      enqueueSnackbar(formattedError);
    },
    [enqueueSnackbar, setError]
  );

  //Fetching data from teh django backend
  const getResourceList = useCallback(() => {
    axios
      .get(`/api/${endpoint}/`)
      .then((res) => {
        setResourceList({
          results: res.data,
        });
      })
      .catch(handleRequestResourceError);
  }, [endpoint, handleRequestResourceError]);
  //end of fetching data

  //Posting data to the backend
  const addResource = useCallback(
    (values, successCallback) => {
      axios
        .post(`/api/${endpoint}/`, values)
        .then(() => {
          enqueueSnackbar(`${resourceLabel} added`);
          if (successCallback) {
            successCallback();
          }
        })
        .catch(handleRequestResourceError);
    },
    [endpoint]
  );

  const getResource = useCallback(
    (id) => {
      axios
        .get(`/api/${endpoint}/${id}`)
        .then((res) => {
          const { data } = res;
          setResource(data);
        })
        .catch(handleRequestResourceError);
    },
    [endpoint, handleRequestResourceError]
  );

  const updateResource = useCallback(
    (id, values, successCallback) => {
      axios
        .patch(`/api/${endpoint}/${id}/`, values)
        .then(() => {
          enqueueSnackbar(`${resourceLabel}/update`);
          if (successCallback) {
            successCallback();
          }
        })
        .catch(handleRequestResourceError);
    },
    [endpoint, handleRequestResourceError]
  );

  const deleteResource = useCallback(
    (id) => {
      axios
        .delete(`/api/${endpoint}/${id}/`)
        .then(() => {
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
    [endpoint, resourceList, handleRequestResourceError]
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
