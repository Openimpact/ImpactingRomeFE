import NavBar from "@/components/NavBar";
import FiltersList from "../../components/FiltersList";
import { OperatoriRepository, SpaziRepository } from "@/repos";
import { Anagrafica, CustomDirectusTypes } from "@/repos/types";
import FiltersSpazi from "@/components/FiltersSpazi";

export default async function Page() {
  

  return (
    <div>
      <NavBar />
      <FiltersSpazi></FiltersSpazi>;
    </div>
  );
}
