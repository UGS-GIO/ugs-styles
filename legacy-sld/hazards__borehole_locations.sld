<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>hazards:borehole_locations</sld:Name>
        <sld:UserStyle>
            <sld:Name>hazards_boreholes_style</sld:Name>
            <sld:Title>ugshazards.sde.borehole_locations</sld:Title>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>Cone_Penetration_Test</sld:Name>
                    <sld:Title>Cone Penetration Test</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>exploration_method</ogc:PropertyName>
                            <ogc:Literal>CPT</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#c500ff</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke-opacity">0</sld:CssParameter>
                                    <sld:CssParameter name="stroke-width">0</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>16.0</sld:Size>
                            <sld:Displacement>
                                <sld:DisplacementX>0.0</sld:DisplacementX>
                                <sld:DisplacementY>-0.0</sld:DisplacementY>
                            </sld:Displacement>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Drill</sld:Name>
                    <sld:Title>Drill</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>exploration_method</ogc:PropertyName>
                            <ogc:Literal>Drill</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#ff0000</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke-opacity">0</sld:CssParameter>
                                    <sld:CssParameter name="stroke-width">0</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>16.0</sld:Size>
                            <sld:Displacement>
                                <sld:DisplacementX>0.0</sld:DisplacementX>
                                <sld:DisplacementY>-0.0</sld:DisplacementY>
                            </sld:Displacement>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Trench</sld:Name>
                    <sld:Title>Trench</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>exploration_method</ogc:PropertyName>
                            <ogc:Literal>Excavation</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#0070ff</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke-opacity">0</sld:CssParameter>
                                    <sld:CssParameter name="stroke-width">0</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>16.0</sld:Size>
                            <sld:Displacement>
                                <sld:DisplacementX>0.0</sld:DisplacementX>
                                <sld:DisplacementY>-0.0</sld:DisplacementY>
                            </sld:Displacement>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

