export const useUploadTwitchLink = () => {
  const onClickUploadTwitchLink = async (videoId: string) => {
    const res = await fetch(`/api/getTwitchData?videoId=987654321`);

    if (!res.ok) {
      return { error: "Something went wrong" };
    }

    const { vodData, error } = await res.json();

    if (!vodData || error) {
      console.log(error);
      return error;
    }

    console.log(vodData);
    return vodData;
  };

  return { onClickUploadTwitchLink };
};
