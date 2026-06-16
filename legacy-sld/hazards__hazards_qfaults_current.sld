<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>hazards:hazards_qfaults_current</sld:Name>
        <sld:UserStyle>
            <sld:Name>hazards_qfaults_test_style</sld:Name>
            <sld:Title>Quaternary_Faults</sld:Title>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>_150_Years__Well_Constrained</sld:Name>
                    <sld:Title>&lt;150 Years, Well Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>qffhazardunit</ogc:PropertyName>
                            <ogc:Literal>U150WCqff</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#e60000</sld:CssParameter>
                            <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_15_000_Years_Well_Constrained</sld:Name>
                    <sld:Title>&lt;15,000 Years, Well Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>qffhazardunit</ogc:PropertyName>
                            <ogc:Literal>U15KWCqff</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#e69800</sld:CssParameter>
                            <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_15_000_Years__Moderately_Constrained</sld:Name>
                    <sld:Title>&lt;15,000 Years, Moderately Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>qffhazardunit</ogc:PropertyName>
                            <ogc:Literal>U15KMCqff</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#e69800</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">8.0 2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_15_000_Years__Inferred</sld:Name>
                    <sld:Title>&lt;15,000 Years, Inferred</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>qffhazardunit</ogc:PropertyName>
                            <ogc:Literal>U15KIqff</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#e69800</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">3.0 3.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_130_000_Years__Well_Constrained</sld:Name>
                    <sld:Title>&lt;130,000 Years, Well Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>qffhazardunit</ogc:PropertyName>
                            <ogc:Literal>U130KWCqff</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#4ce600</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_130_000_Years__Moderately_Constrained</sld:Name>
                    <sld:Title>&lt;130,000 Years, Moderately Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>qffhazardunit</ogc:PropertyName>
                            <ogc:Literal>U130KMCqff</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#4ce600</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">8.0 2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_130_000_Years__Inferred</sld:Name>
                    <sld:Title>&lt;130,000 Years, Inferred</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>qffhazardunit</ogc:PropertyName>
                            <ogc:Literal>U130KIqff</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#4ce600</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">3.0 3.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_750_000_Years__Well_Constrained</sld:Name>
                    <sld:Title>&lt;750,000 Years, Well Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>qffhazardunit</ogc:PropertyName>
                            <ogc:Literal>U750KWCqff</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#005ce6</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_750_000_Years__Moderately_Constrained</sld:Name>
                    <sld:Title>&lt;750,000 Years, Moderately Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>qffhazardunit</ogc:PropertyName>
                            <ogc:Literal>U750KMCqff</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#005ce6</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">8.0 2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_750_000_Years__Inferred</sld:Name>
                    <sld:Title>&lt;750,000 Years, Inferred</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>qffhazardunit</ogc:PropertyName>
                            <ogc:Literal>U750KIqff</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#005ce6</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">3.0 3.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_2_6_Million_Years__Well_Constrained</sld:Name>
                    <sld:Title>&lt;2.6 Million Years, Well Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>qffhazardunit</ogc:PropertyName>
                            <ogc:Literal>U2600KWCqff</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_2_6_Million_Years__Moderately_Constrained</sld:Name>
                    <sld:Title>&lt;2.6 Million Years, Moderately Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>qffhazardunit</ogc:PropertyName>
                            <ogc:Literal>U2600KMCqff</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">8.0 2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>_2_6_Million_Years__Inferred</sld:Name>
                    <sld:Title>&lt;2.6 Million Years, Inferred</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>qffhazardunit</ogc:PropertyName>
                            <ogc:Literal>U2600KIqff</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">3.0 3.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Undetermined__Well_Constrained</sld:Name>
                    <sld:Title>Undetermined, Well Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>qffhazardunit</ogc:PropertyName>
                            <ogc:Literal>UDWCqff</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#a900e6</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Undetermined__Moderately_Constrained</sld:Name>
                    <sld:Title>Undetermined, Moderately Constrained</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>qffhazardunit</ogc:PropertyName>
                            <ogc:Literal>UDMCqff</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#a900e6</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">8.0 2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Undetermined__Inferred</sld:Name>
                    <sld:Title>Undetermined, Inferred</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>qffhazardunit</ogc:PropertyName>
                            <ogc:Literal>UDIqff</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#a900e6</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.0</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">3.0 3.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

