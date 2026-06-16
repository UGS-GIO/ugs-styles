<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>gen_gis:24kquads</sld:Name>
        <sld:UserStyle>
            <sld:Name>gengis_24kquadboundaries_style</sld:Name>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>Single symbol</sld:Name>
                    <sld:Title>Quadrangle Boundary</sld:Title>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#729b6f</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#a80000</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">bevel</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">4</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:MaxScaleDenominator>369948.0</sld:MaxScaleDenominator>
                    <sld:TextSymbolizer>
                        <sld:Label>
                            <ogc:PropertyName>name</ogc:PropertyName>
                        </sld:Label>
                        <sld:Font>
                            <sld:CssParameter name="font-family">Arial Black</sld:CssParameter>
                            <sld:CssParameter name="font-size">14</sld:CssParameter>
                            <sld:CssParameter name="font-style">normal</sld:CssParameter>
                            <sld:CssParameter name="font-weight">normal</sld:CssParameter>
                        </sld:Font>
                        <sld:LabelPlacement>
                            <sld:PointPlacement>
                                <sld:AnchorPoint>
                                    <sld:AnchorPointX>0</sld:AnchorPointX>
                                    <sld:AnchorPointY>0.5</sld:AnchorPointY>
                                </sld:AnchorPoint>
                            </sld:PointPlacement>
                        </sld:LabelPlacement>
                        <sld:Halo>
                            <sld:Radius>2</sld:Radius>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#fafafa</sld:CssParameter>
                            </sld:Fill>
                        </sld:Halo>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#323232</sld:CssParameter>
                        </sld:Fill>
                        <sld:VendorOption name="maxDisplacement">1</sld:VendorOption>
                    </sld:TextSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

