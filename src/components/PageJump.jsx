import { set } from "immutable"


export default function PageJump({ setPokeOffset, setIsLoading }) {
    return (
        <td colSpan={4}>
            <form action="" onSubmit={(e) => e.preventDefault()}>
                <input id="jump-input" type="number" placeholder="1-100" min={0} max={100}/>
                <button onClick={()=>{
                    const target = document.getElementById("jump-input").value * 10;
                    setIsLoading(true)
                    setPokeOffset(target)
                }}>Jump</button>
            </form>
        </td>
    )
}