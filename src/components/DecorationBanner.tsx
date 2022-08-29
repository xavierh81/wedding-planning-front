// Imports
import React from 'react';

// Define main props types
type DecorationBannerProps = {
  reverse?: boolean
}

const DecorationBanner : React.FunctionComponent<DecorationBannerProps> = ({reverse = false }) => {
  //
  // Rendering
  //
  return (
    <picture className={`decorationBanner ${reverse ? ' reverse' : ''}`}>
        <source media="(min-width: 1280px)" srcSet="https://media-api.xogrp.com/images/cb64b330-59bd-4a37-a6bb-ccbefe1c128c~rt_auto-rs_3000.h?ordering=explicit" />
        <source media="(min-width: 1024px)" srcSet="https://media-api.xogrp.com/images/cb64b330-59bd-4a37-a6bb-ccbefe1c128c~rt_auto-rs_2560.h?ordering=explicit" />
        <source media="(min-width: 768px)" srcSet="https://media-api.xogrp.com/images/cb64b330-59bd-4a37-a6bb-ccbefe1c128c~rt_auto-rs_2048.h?ordering=explicit" />
        <source srcSet="https://media-api.xogrp.com/images/dad1a764-a834-4064-a90d-9ca565113b96~rt_auto-rs_1536.h?ordering=explicit" />
        <img loading="eager" alt="" src="https://media-api.xogrp.com/images/cb64b330-59bd-4a37-a6bb-ccbefe1c128c~rt_auto-rs_1024.h?ordering=explicit" />
    </picture>
  )
}

export default DecorationBanner