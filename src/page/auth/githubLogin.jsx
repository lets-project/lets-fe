import React, { useEffect } from "react";
import qs from "qs";
import { useLocation, useNavigate } from "react-router";
import { fetchUserById } from "store/user";
import { useDispatch } from "react-redux";
import { nextStep, setModalVisible, setSignUpUser } from "store/loginStep";
import Modal from "component/modal/modal_component/modal";
import LoadingSpinner from "component/loading/loadingSpinner";

/* 

github login component 입니다.
github에서 popup login을 만들어 주지 않아 자체적으로 component를 만들었고,
code와 함께 redirection 되면 login 시도 후 main으로 이동합니다.


*/

const GithubLogin = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = () => {
      const { code } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      const userData = { socialLoginId: code, authProvider: "github" };
      dispatch(fetchUserById(userData)).then((response) => {
        if (response.type != fetchUserById.fulfilled) {
          dispatch(
            setSignUpUser({
              key: "socialLoginId",
              value: userData.socialLoginId,
            })
          );
          dispatch(
            setSignUpUser({ key: "authProvider", value: userData.authProvider })
          );
          dispatch(setModalVisible(true));
          dispatch(nextStep());
        }
        navigate("/");
      });
    };

    getToken();
  }, [dispatch, navigate, location.search]);

  return (
    <Modal visible={true} name="loading">
      <LoadingSpinner />
    </Modal>
  );
};

export default GithubLogin;
