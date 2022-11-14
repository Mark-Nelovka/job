import { useEffect } from "react";
import { useThemeContext } from "../../context/context";

export default function DetailedJob() {
  const ctx = useThemeContext();

  useEffect(() => {
    console.log(ctx.activeStar);
  }, [ctx.activeStar]);

  return <section>Detailed Jof</section>;
}
