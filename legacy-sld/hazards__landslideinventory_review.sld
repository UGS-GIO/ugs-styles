<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>hazards:landslideinventory_review</sld:Name>
        <sld:UserStyle>
            <sld:Name>hazards_landslideinventory_style</sld:Name>
            <sld:Title>Landslides</sld:Title>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>Cliff_Band</sld:Name>
                    <sld:Title>Cliff Band</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>lsfhazardunit</ogc:PropertyName>
                            <ogc:Literal>CBlsf</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#e60000</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Channel_Debris_Flow</sld:Name>
                    <sld:Title>Channel/Debris Flow</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>lsfhazardunit</ogc:PropertyName>
                            <ogc:Literal>CDFlsf</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#d2f49f</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Debris_Flow_Source_Area</sld:Name>
                    <sld:Title>Debris Flow Source Area</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>lsfhazardunit</ogc:PropertyName>
                            <ogc:Literal>DFSAlsf</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#64c3ef</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Debris_Flow</sld:Name>
                    <sld:Title>Debris Flow</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>lsfhazardunit</ogc:PropertyName>
                            <ogc:Literal>DFlsf</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#f9a7aa</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Earth_Flow</sld:Name>
                    <sld:Title>Earth Flow</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>lsfhazardunit</ogc:PropertyName>
                            <ogc:Literal>EFlsf</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#5eed71</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Fall_Prone_Slope_Talus</sld:Name>
                    <sld:Title>Fall-Prone Slope Talus</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>lsfhazardunit</ogc:PropertyName>
                            <ogc:Literal>FPSTlsf</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#f4b164</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Fall_Prone_Slope</sld:Name>
                    <sld:Title>Fall-Prone Slope</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>lsfhazardunit</ogc:PropertyName>
                            <ogc:Literal>FPSlsf</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#bf96e8</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Main_Scarp</sld:Name>
                    <sld:Title>Main Scarp</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>lsfhazardunit</ogc:PropertyName>
                            <ogc:Literal>MSlsf</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#5e5b91</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Outcrop</sld:Name>
                    <sld:Title>Outcrop</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>lsfhazardunit</ogc:PropertyName>
                            <ogc:Literal>Olsf</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#876543</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Rotational_Slide</sld:Name>
                    <sld:Title>Rotational Slide</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>lsfhazardunit</ogc:PropertyName>
                            <ogc:Literal>RSlsf</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#d8f259</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Translational_Block_Slide</sld:Name>
                    <sld:Title>Translational Block Slide</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>lsfhazardunit</ogc:PropertyName>
                            <ogc:Literal>TBSlsf</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#5befdb</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Translational_Debris_Slide</sld:Name>
                    <sld:Title>Translational Debris Slide</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>lsfhazardunit</ogc:PropertyName>
                            <ogc:Literal>TDSlsf</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#53875e</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Topple_Prone_Slope_Talus</sld:Name>
                    <sld:Title>Topple-Prone Slope Talus</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>lsfhazardunit</ogc:PropertyName>
                            <ogc:Literal>TPSTlsf</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#4a4ad3</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Mapped_Landslide</sld:Name>
                    <sld:Title>Mapped Landslide</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>lsfhazardunit</ogc:PropertyName>
                            <ogc:Literal>Ulsf</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#8c3352</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

