<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>hazards:floodanddebrisflow_join</sld:Name>
        <sld:UserStyle>
            <sld:Name>hazards_floodanddebrisflow_style</sld:Name>
            <sld:Title>Flood Hazard</sld:Title>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>Very_High_Flood_Hazard</sld:Name>
                    <sld:Title>Very High Flood Hazard</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>flhhazardunit</ogc:PropertyName>
                            <ogc:Literal>VHflh</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#e600a9</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>High_Flood_Hazard</sld:Name>
                    <sld:Title>High Flood Hazard</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>flhhazardunit</ogc:PropertyName>
                            <ogc:Literal>Hflh</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#ff0000</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Moderate_Flood_Hazard</sld:Name>
                    <sld:Title>Moderate Flood Hazard</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>flhhazardunit</ogc:PropertyName>
                            <ogc:Literal>Mflh</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#ffaa00</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Low_Flood_Hazard</sld:Name>
                    <sld:Title>Low Flood Hazard</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>flhhazardunit</ogc:PropertyName>
                            <ogc:Literal>Lflh</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#38a800</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Very_Low_Flood_Hazard</sld:Name>
                    <sld:Title>Very Low Flood Hazard</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>flhhazardunit</ogc:PropertyName>
                            <ogc:Literal>VLflh</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#73dfff</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Undefined_Flood_Hazard</sld:Name>
                    <sld:Title>Undefined Flood Hazard</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>flhhazardunit</ogc:PropertyName>
                            <ogc:Literal>Uflh</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#e1e1e1</sld:CssParameter>
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

