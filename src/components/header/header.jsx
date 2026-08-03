// Ce composant est utilise pour afficher l'entete de l'appli
import { IconListChecks, IconMoon, IconSun } from "../icons";
import { useTheme } from "../../hooks/useTheme";
import Styles from './header.module.css';
export const Header = () =>{
    const { theme, toggleTheme } = useTheme();

    return(
        <div className={Styles.container}>
<div className={Styles.titleContainer}>
<div className={Styles.logo}>
    <IconListChecks width={26} height={26} />
</div>
<div>
    <h1>Gestionnaire des Tâches</h1>
    <div className="color-gray">
 <code>Éliminez le chaos, suivez le flux</code>
    </div>
</div>
</div>
<div className={Styles.actions}>
    <button
        type="button"
        className={Styles.themeToggle}
        onClick={toggleTheme}
        title={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
        aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
    >
        {theme === "dark" ? <IconSun width={18} height={18} /> : <IconMoon width={18} height={18} />}
    </button>
    <code className={`color-primary ${Styles.version}`}>v.1.0</code>
</div>
        </div>
    );
};
