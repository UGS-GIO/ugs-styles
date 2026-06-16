<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>hazards:karstfeatures_join</sld:Name>
        <sld:UserStyle>
            <sld:Name>hazards_karstfeatures_style</sld:Name>
            <sld:Title>Karst Features</sld:Title>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>Sinkhole</sld:Name>
                    <sld:Title>Sinkhole</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>mkfhazardunit</ogc:PropertyName>
                            <ogc:Literal>SHmkf</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>ttf://ESRI Transportation &amp; Civic#0x72</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#e60000</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke-opacity">0</sld:CssParameter>
                                    <sld:CssParameter name="stroke-width">0</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>24.0</sld:Size>
                            <sld:Displacement>
                                <sld:DisplacementX>0.0</sld:DisplacementX>
                                <sld:DisplacementY>-0.0</sld:DisplacementY>
                            </sld:Displacement>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Breccia_Pipe</sld:Name>
                    <sld:Title>Breccia Pipe</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>mkfhazardunit</ogc:PropertyName>
                            <ogc:Literal>BPmkf</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>ttf://ESRI Transportation &amp; Civic#0x72</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#a87000</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke>
                                    <sld:CssParameter name="stroke-opacity">0</sld:CssParameter>
                                    <sld:CssParameter name="stroke-width">0</sld:CssParameter>
                                </sld:Stroke>
                            </sld:Mark>
                            <sld:Size>24.0</sld:Size>
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

