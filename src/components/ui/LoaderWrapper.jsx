import { useLoader } from "../../context/LoaderContext";
import Loader from "./Loader";

export default function LoaderWrapper() {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return <Loader />;
}