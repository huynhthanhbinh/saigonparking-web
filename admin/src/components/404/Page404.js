import React, { useEffect } from 'react'
import styles from './Error404.module.css'

const Page404 = () => {

    useEffect(() => {
        const script = document.createElement("script");
        script.type = "text/javascript"
        script.innerHTML = `var container = document.getElementById('${styles.container404}');
                            window.onmousemove = function(e){
                                var x = - e.clientX/5,
                                    y = - e.clientY/5;
                                container.style.backgroundPositionX = x + 'px';
                                container.style.backgroundPositionY = y + 'px';
                            }`;
        document.body.appendChild(script);
    }, [])

    return (
        <>
            <section className={styles.section404}>
                <div id={styles.container404}>
                    <div className={styles.content404}>
                        <h2 className={styles.h2404}>404</h2>
                        <h4 className={styles.h4404}>Opps! Page not found</h4>
                        <p className={styles.p404}>The page you were looking for doesn't exist!</p>
                        <a className={styles.a404} href="/login ">Back to Home</a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Page404