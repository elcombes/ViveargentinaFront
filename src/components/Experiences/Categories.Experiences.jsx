import styles from '../Experiences/Experiences.module.css';

export default function CategoriesExperiences() {

    return (
        <div>
            <ul className={styles.categoryicons}>
                <li><i className="bi bi-eyeglasses"></i><br />Cultural</li>
                <li><i className="bi bi-bicycle"></i><br /> Adventure</li>
                <li><i className="bi bi-snow2"></i><br /> Snow</li>
                <li><i className="bi bi-airplane-engines"></i><br /> Landscape</li>
                <li><i className="bi bi-camera2"></i><br /> Air</li>
                <li><i className="bi bi-browser-safari"></i><br /> Nautic</li>
                <li><i className="bi bi-water"></i><br /> Termas</li>
                <li><i className="bi bi-lamp-fill"></i><br /> Entertainment</li>
                <li><i className="bi bi-egg-fried"></i><br /> Gastronomic</li>
                <li><i className="bi bi-dribbble"></i><br /> Sports</li>
            </ul>
            
        </div>
    )
}