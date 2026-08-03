// Ce composant est utilise pour afficher le champ de saisie de l'appli
import { IconParty } from "../icons";
import style from "./Footer.module.css";
export const Footer = ({completedTask}) =>{

  if (completedTask){
    return(
      <footer className={style.container}>
        <code className={style.footer}>
          <IconParty width={16} height={16} />
          Avec Le Gestionnaire des Tâches vous avez éliminé {completedTask} tâche
          {completedTask > 1 ? "s" : ""} !
        </code>
      </footer>
    );
  }
  return null;
};