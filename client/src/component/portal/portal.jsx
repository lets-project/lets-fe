import { useMemo } from "react";
import { createPortal } from "react-dom";

function Portal({ children, elementId }) {
  const rootElement = useMemo(() => document.getElementById(elementId), [
    elementId,
  ]);

  return createPortal(children, rootElement);
}
// todo 에러해결 현재 이 Portal을 이용하면 에러가 남.. Modal 쓸 때 Portal을 쓰는 것을 권장해서 넣었는데 Portal에 대한 이해가 부족한 것으로 보임.
export default Portal;
