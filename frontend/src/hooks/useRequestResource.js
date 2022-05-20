import { useCallback, useState } from "react";
import axios from "axios";

import React from "react";

export default function useRequestResource({ endpoint }) {
  const [resourceList, setResourceList] = useState({
    results: [],
  });
  const [resource, setResource] = useState(null);

  //Fetching data from teh django backend
  const getResourceList = useCallback(() => {
    axios
      .get(`/api/${endpoint}/`)
      .then((res) => {
        setResourceList({
          results: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [endpoint]);
  //end of fetching data

  //Posting data to the backend
  const addResource = useCallback(
    (values, successCallback) => {
      axios
        .post(`/api/${endpoint}/`, values)
        .then(() => {
          if (successCallback) {
            successCallback();
          }
        })
        .catch((err) => {
          console.error(err);
        });
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
        .catch((err) => {
          console.error(err);
        });
    },
    [endpoint]
  );

  const updateResource = useCallback(
    (id, values, successCallback) => {
      axios
        .patch(`/api/${endpoint}/${id}/`, values)
        .then(() => {
          if (successCallback) {
            successCallback();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [endpoint]
  );

  const deleteResource = useCallback(
    (id) => {
      axios
        .delete(`/api/${endpoint}/${id}/`)
        .then(() => {
          const newResourceList = {
            results: resourceList.results.filter((r) => {
              return r.id !== id;
            }),
          };
          setResourceList(newResourceList);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [endpoint, resourceList]
  );
  //Return those functions
  return {
    resourceList,
    getResourceList,
    addResource,
    resource,
    getResource,
    updateResource,
    deleteResource,
  };
}
