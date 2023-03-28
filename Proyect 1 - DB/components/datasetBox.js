import React from 'react';

const datasetBox = props => (
    <div id={props.datasetId} class="col-3 list-group mt-5 mx-5">
      <a onclick= {props.href} class="container d-flex flex-column list-group-item list-group-item-action ">
        <div class="d-flex justify-content-center">
          <img id="datasetImage" class="card-img-top mx-auto" src={props.datasetImage} Style="width: 55%"/>
        </div>
        <div>
          <p id="nameD1" class="card-title h6 mx-3">{props.datasetName}</p>
          <p id="descriptionD1" class="card-text text-secondary mx-3">{props.datasetDescription}</p>
        </div>

        <hr class="mt-2"/>
        <div class="col-12 d-flex">
          <div class="col-8 d-flex flex-column justify-content-around">
            <div><p id="dateIncludeD1" class="text-secondary mx-3">{props.datasetIncludeDate}</p></div>
            <div><p id="countFilesD1" class="text-secondary mx-3">{props.datasetFilesAmount}</p></div>
          </div>

          <div class="col-3 d-flex flex-column justify-content-around">
            <div><p id="sizeD1" class="text-secondary mx-3">{props.datasetSize}</p></div>

            <div class="mx-3">
              <div class="card" style="height: 30px; width: 70px;">
              <div class=" col-12 d-flex flex-row ">
                <div class="col-6" >
                  <p id="dataSetLikes" class="text-secondary mt-1 mx-2">{props.datasetLikes}</p>
                </div>
                <div class="class=6">
                  <img src="Images/Icons/like.png" style="width: 20px;"/>
                </div>
              </div>   
            </div>
          </div>
        </div>
          
      </div>
    </a>
  </div>
)

export default datasetBox;