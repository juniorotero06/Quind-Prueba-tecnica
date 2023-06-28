export const getRequest = async ({ setFunction, patch }) => {
  try {
    const response = await fetch(`http://localhost:3001/v1/api/${patch}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }

    const data = await response.json();
    setFunction(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const postRequest = async ({ getFn, values, patch }) => {
  await fetch(`http://localhost:3001/v1/api/${patch}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((data) => {
      getFn();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const patchRequest = async ({ getFn, values, patch, id }) => {
  await fetch(`http://localhost:3001/v1/api/${patch}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((data) => {
      getFn();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const deleteRequest = async ({ patch, id }) => {
  try {
    const response = await fetch(
      `http://localhost:3001/v1/api/${patch}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete ${patch}`);
    }

    console.log(`${patch} deleted successfully`);
  } catch (error) {
    console.error("Error:", error);
  }
};
