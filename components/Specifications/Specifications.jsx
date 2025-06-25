import React from "react";
import "./specfications.css";
import "../../public/assets/css/theme/main.css";

export default function Specifications() {
  return (
    <section className="specfication">
      <div className="container mt-2">
        <h1>Specifications</h1>
        <div className="row border_bottom pb-2 mt-2">
          <div className="col-md-4">
            <div className="display_main_div">
              <h3>Display</h3>
            </div>
          </div>
          <div className="col-md-8 ">
            <div className="spec_info_div ">
              <div className="spec_item">
                <h6>Screen Size</h6>
                <p>56"</p>
              </div>
              <div className="spec_item">
                <h6>Screen Size</h6>
                <p>56"</p>
              </div>
              <div className="spec_item">
                <h6>Screen Size</h6>
                <p>56"</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row border_bottom pb-2 mt-2">
          <div className="col-md-4">
            <div className="display_main_div">
              <h3>Audio</h3>
            </div>
          </div>
          <div className="col-md-8 ">
            <div className="spec_info_div ">
              <div className="spec_item">
                <h6>Dolby Digital Plus </h6>
                <p>Yes</p>
              </div>
              <div className="spec_item">
                <h6>Dolby 5.1 Decoder</h6>
                <p>Yes</p>
              </div>
              <div className="spec_item">
                <h6>Active Voice Amplifier </h6>
                <p>Yes</p>
              </div>
              <div className="spec_item">
                <h6>Adaptive Sound </h6>
                <p>Adaptive Sound+</p>
              </div>
              <div className="spec_item">
                <h6>Object Tracking Sound </h6>
                <p>OTS+ </p>
              </div>
              <div className="spec_item">
                <h6>Q-Symphony </h6>
                <p>Yes </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row border_bottom pb-2 mt-2">
          <div className="col-md-4">
            <div className="display_main_div">
              <h3>Operating System</h3>
            </div>
          </div>
          <div className="col-md-8 ">
            <div className="spec_info_div ">
              <div className="spec_item">
                <h6></h6>
                <p>Tizen™</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row border_bottom pb-2 mt-2">
          <div className="col-md-4">
            <div className="display_main_div">
              <h3>Dimension</h3>
            </div>
          </div>
          <div className="col-md-8 ">
            <div className="spec_info_div ">
              <div className="spec_item">
                <h6>Package Size (WxHxD) </h6>
                <p>1427 x 843 x 179 mm</p>
              </div>
              <div className="spec_item">
                <h6>Set Size without Stand (WxHxD) </h6>
                <p>1224.8 x 705.3 x 71.8 mm</p>
              </div>
              <div className="spec_item">
                <h6>Set Size with Stand (WxHxD) </h6>
                <p>1224.8 x 774.5 x 300.6 mm</p>
              </div>
              <div className="spec_item">
                <h6>Set Size with Stand (WxHxD) </h6>
                <p>1224.8 x 774.5 x 300.6 mm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
