import '../css/CustomCard.css'
import { useRef, useEffect } from "react";

export const CustomCard = (props) => {
    const element = useRef(null);
    useEffect(() => {
        let isResizing = false;
        const content = document.querySelector('.content');
        const e = element.current;
        const conditions = {
            left: ({ elementLeft, contentLeft, movement, elementWidth, contentRight }) => {
                return (elementLeft > contentLeft && movement <= 0)
                    || (elementLeft + elementWidth < contentRight && movement >= 0)
            },
            top: ({ elementTop, contentTop, movement, elementHeight, contentBottom }) => {
                return (elementTop > contentTop && movement < 0)
                    || (elementTop + elementHeight < contentBottom && movement > 0)
            },
        };
        e.addEventListener('mousedown', drag);

        function drag($event) {
            window.addEventListener('mousemove', mousemove);
            window.addEventListener('mouseup', mouseup);

            let prevX = $event.clientX;
            let prevY = $event.clientY;

            function mousemove($event) {
                if (!isResizing) {
                    let newX = prevX - $event.clientX;
                    let newY = prevY - $event.clientY;
                    const rect = e.getBoundingClientRect();
                    const contentRect = content.getBoundingClientRect();
                    const left = rect.left - newX;
                    const top = rect.top - newY;
                    const conditionLeft = conditions.left({
                        elementLeft: left,
                        contentLeft: contentRect.left,
                        movement: $event.movementX,
                        elementWidth: rect.width,
                        contentRight: contentRect.right,
                    })
                    const conditionTop = conditions.top({
                        elementTop: top,
                        contentTop: contentRect.top,
                        movement: $event.movementY,
                        elementHeight: rect.height,
                        contentBottom: contentRect.bottom,
                    })
                    if (conditionLeft) {
                        e.style.left = `${left}px`
                    }
                    if (conditionTop) {
                        e.style.top = `${top}px`
                    }
                    prevX = $event.clientX;
                    prevY = $event.clientY;
                }
            }

            function mouseup() {
                window.removeEventListener('mousemove', mousemove);
                window.removeEventListener('mouseup', mouseup);
            }
        }


        const resizers = e.querySelectorAll('.resizer');
        let currentResizer;

        for (let resizer of resizers) {
            resizer.addEventListener('mousedown', resize);

            function resize($event) {
                isResizing = true;
                currentResizer = $event.target;
                let prevX = $event.clientX;
                let prevY = $event.clientY;
                window.addEventListener('mousemove', mousemove);
                window.addEventListener('mouseup', mouseup);

                function mousemove($event) {
                    const rect = e.getBoundingClientRect();
                    const elementRect = {
                        top: rect.top,
                        left: rect.left,
                        height: rect.height,
                        width: rect.width,
                    };
                    const contentRect = content.getBoundingClientRect();
                    if (currentResizer.classList.contains("se")) {
                        elementRect.width = rect.width - (prevX - $event.clientX);
                        elementRect.height = rect.height - (prevY - $event.clientY);
                    } else if (currentResizer.classList.contains("sw")) {
                        elementRect.width = rect.width + (prevX - $event.clientX);
                        elementRect.height = rect.height - (prevY - $event.clientY);
                        elementRect.left = rect.left - (prevX - $event.clientX);
                    } else if (currentResizer.classList.contains("ne")) {
                        elementRect.width = rect.width - (prevX - $event.clientX);
                        elementRect.height = rect.height + (prevY - $event.clientY);
                        elementRect.top = rect.top - (prevY - $event.clientY);
                    } else if (currentResizer.classList.contains("nw")) {
                        elementRect.width = rect.width + (prevX - $event.clientX);
                        elementRect.height = rect.height + (prevY - $event.clientY);
                        elementRect.top = rect.top - (prevY - $event.clientY);
                        elementRect.left = rect.left - (prevX - $event.clientX);
                    }
                    prevX = $event.clientX;
                    prevY = $event.clientY;
                    const conditionTop = conditions.top({
                        elementTop: elementRect.top,
                        elementHeight: elementRect.height,
                        contentTop: contentRect.top,
                        contentBottom: contentRect.bottom,
                        movement: $event.movementY,
                    });
                    const conditionLeft = conditions.left({
                        elementLeft: elementRect.left,
                        elementWidth: elementRect.width,
                        contentLeft: contentRect.left,
                        contentRight: contentRect.right,
                        movement: $event.movementX,
                    });
                    if (conditionTop)  {
                        e.style.height = `${elementRect.height}px`;
                        e.style.top = `${elementRect.top}px`;
                    }
                    if (conditionLeft)  {
                        e.style.width = `${elementRect.width}px`;
                        e.style.left = `${elementRect.left}px`;
                    }
                }

                function mouseup() {
                    window.removeEventListener('mousemove', mousemove);
                    window.removeEventListener('mouseup', mouseup);
                    isResizing = false;
                }
            }
        }
    }, [])

    return (

        <div id={props.card.id} ref={element} className={`custom-card elem-${props.card.id}`}>
            <div className='resizer ne'></div>
            <div className='resizer nw'></div>
            <div className='resizer sw'></div>
            <div className='resizer se'></div>
            <span>
                {props.card.title}
                <span onClick={() => props.onDeleteCard(props.card)}>&times;</span>
            </span>
        </div>

    )
};
