import React from 'react';

function ProfileProduct(props) {
    let data = props.data
    return (
        <div className="table-responsive">
            <table className="table">
                <tbody>
                    <tr>
                        <td>
                            <h5>Width</h5>
                        </td>
                        <td>
                            <h5>{data.width}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Height</h5>
                        </td>
                        <td>
                            <h5>{data.height}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Weight</h5>
                        </td>
                        <td>
                            <h5>{data.weight}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Quality control</h5>
                        </td>
                        <td>
                            <h5>yes</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Warranty</h5>
                        </td>
                        <td>
                            <h5>yes</h5>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ProfileProduct;