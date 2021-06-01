import React from 'react'
import '../App.css';
const Loader = () => {
    return (
<div className="loadingbar--container position-relative">
	<section className="dpl-loading--container --is-active">
          <span className="dpl-loading--progress --is-infinite repeat"></span>
        </section>
</div>

    )
}

export default Loader
