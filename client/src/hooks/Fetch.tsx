export default async function Fetch(
  path: string,
  data: any,
  method: "POST" | "GET" | "PATCH" | "DELETE",
  headers: any
) {
  return new Promise((resolve, reject) => {
    try {
      fetch(path, {
        method: method,
        body: JSON.stringify(data),
        headers: headers,
      }).then((res) => {
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
}
