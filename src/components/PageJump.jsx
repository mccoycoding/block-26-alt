export default function PageJump({ setPokeOffset, setIsLoading }) {
    return (
        <td colSpan={4}>
            <form className="input-group mb-3" action="" onSubmit={(e) => e.preventDefault()}>
                <input className="form-control" id="jump-input" type="number" placeholder="1-100" min={0} max={100} aria-label="Target page" aria-describedby="jump-submit"/>
                <button id="jump-submit" className="btn btn-primary" onClick={()=>{
                    const target = document.getElementById("jump-input").value * 10;
                    if (target > 1000) return 
                    setIsLoading(true)
                    setPokeOffset(target)
                }}>Jump</button>
            </form>
        </td>
    )
}